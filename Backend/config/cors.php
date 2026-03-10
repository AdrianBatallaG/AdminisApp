<?php

$defaultOrigins = array_filter([
    rtrim((string) env('FRONTEND_URL', ''), '/'),
    'http://localhost:5173',
    'http://127.0.0.1:5173',
]);

$normalizeCsv = static function (string $value): array {
    return array_values(array_filter(array_map(
        static fn (string $item): string => rtrim(trim($item), '/'),
        explode(',', $value)
    )));
};

$allowedOrigins = $normalizeCsv((string) env('CORS_ALLOWED_ORIGINS', implode(',', $defaultOrigins)));

$rawPatterns = array_values(array_filter(array_map(
    static fn (string $pattern): string => trim($pattern),
    explode(',', (string) env('CORS_ALLOWED_ORIGIN_PATTERNS', ''))
)));

$allowedOriginPatterns = array_values(array_filter($rawPatterns, static function (string $pattern): bool {
    if ($pattern === '') {
        return false;
    }

    return @preg_match('/'.$pattern.'/', 'https://example.com') !== false;
}));

if (empty($allowedOriginPatterns) && app()->environment('production')) {
    $allowedOriginPatterns = ['^https://.*\.vercel\.app$'];
}

return [

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => $allowedOrigins,

    'allowed_origins_patterns' => $allowedOriginPatterns,

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => filter_var(
        env('CORS_SUPPORTS_CREDENTIALS', false),
        FILTER_VALIDATE_BOOLEAN
    ),

];
