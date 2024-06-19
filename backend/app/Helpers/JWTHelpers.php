<?php

namespace App\Helpers;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use stdClass;

class JWTHelpers
{
    public static function encode(array $payload, int $ttl, string $secretKey): string
    {
        $payload['iat'] = time();
        $payload['exp'] = time() + ($ttl * 60);

        return JWT::encode($payload, $secretKey, 'HS256');
    }

    public static function decode(string $token, string $secretKey): stdClass
    {
        $payload = JWT::decode($token, new Key($secretKey, 'HS256'));

        return $payload;
    }
}
