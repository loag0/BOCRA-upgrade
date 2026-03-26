package bw.org.bocra.backend.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Simple sliding-window rate limiter per IP address.
 * Resets the counter every {@code windowMs} milliseconds.
 */
@Component
public class RateLimitFilter extends OncePerRequestFilter {

    @Value("${rate-limit.requests-per-window:100}")
    private int maxRequests;

    @Value("${rate-limit.window-ms:60000}")
    private long windowMs;

    private final Map<String, RateWindow> clients = new ConcurrentHashMap<>();

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        // Skip preflight requests
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            filterChain.doFilter(request, response);
            return;
        }

        String clientIp = resolveClientIp(request);
        RateWindow window = clients.compute(clientIp, (key, existing) -> {
            long now = System.currentTimeMillis();
            if (existing == null || now - existing.windowStart > windowMs) {
                return new RateWindow(now, new AtomicInteger(1));
            }
            existing.count.incrementAndGet();
            return existing;
        });

        int remaining = Math.max(0, maxRequests - window.count.get());

        response.setHeader("X-RateLimit-Limit", String.valueOf(maxRequests));
        response.setHeader("X-RateLimit-Remaining", String.valueOf(remaining));

        if (window.count.get() > maxRequests) {
            long retryAfter = Math.max(1, (windowMs - (System.currentTimeMillis() - window.windowStart)) / 1000);
            response.setHeader("Retry-After", String.valueOf(retryAfter));
            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            response.setContentType("application/json");
            response.getWriter().write(
                    "{\"error\":\"Too many requests\",\"message\":\"Rate limit exceeded. Try again in "
                            + retryAfter + " seconds.\"}"
            );
            return;
        }

        filterChain.doFilter(request, response);
    }

    private String resolveClientIp(HttpServletRequest request) {
        String forwarded = request.getHeader("X-Forwarded-For");
        if (forwarded != null && !forwarded.isEmpty()) {
            // Take only the first IP (original client) to prevent spoofing
            return forwarded.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }

    private static class RateWindow {
        final long windowStart;
        final AtomicInteger count;

        RateWindow(long windowStart, AtomicInteger count) {
            this.windowStart = windowStart;
            this.count = count;
        }
    }
}

