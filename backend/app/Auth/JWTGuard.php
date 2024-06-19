<?php

namespace App\Auth;

use Exception;
use App\Helpers\JWTHelpers;
use App\Models\Token;
use Illuminate\Auth\GuardHelpers;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Auth\UserProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class JWTGuard implements Guard
{
    use GuardHelpers;

    /**
     * @var Request
     */
    private Request $request;

    public function __construct(UserProvider $provider, Request $request)
    {
        $this->provider = $provider;
        $this->request = $request;
    }

    /**
     * Get the currently authenticated user.
     *
     * @return \Illuminate\Contracts\Auth\Authenticatable|null
     */
    public function user()
    {
        try {
            if (!is_null($this->user)) return $this->user;

            $accessToken = $this->request->bearerToken();

            if (!$accessToken) return null;

            $decoded = JWTHelpers::decode($accessToken, config('auth.access_token_secret_key'));
            $this->user = $this->provider->retrieveById($decoded->id);

            return $this->user;
        } catch (Exception $exception) {
            return null;
        }
    }

    /**
     * Validate a user's credentials.
     *
     * @param  array  $credentials
     * @return bool
     */
    public function validate(array $credentials = [])
    {
        // 
    }

    /**
     * Attempt to authenticate a user using the given credentials.
     *
     * @param  array  $credentials
     * @return bool
     */
    public function attempt(array $credentials = [])
    {
        $user = $this->provider->retrieveByCredentials($credentials);
        $isValidCredentials = $user ? $this->provider->validateCredentials($user, $credentials) : false;

        if (!$isValidCredentials) return false;

        $payload = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
        ];

        $refreshToken = JWTHelpers::encode($payload, config('auth.refresh_token_ttl'), config('auth.refresh_token_secret_key'));
        $accessToken = JWTHelpers::encode($payload, config('auth.access_token_ttl'), config('auth.access_token_secret_key'));

        Token::create([
            'user_id' => $user->id,
            'refresh_token' => $refreshToken,
        ]);

        return [
            'refresh_token' => $refreshToken,
            'access_token' => $accessToken,
        ];
    }

    /**
     * Log the user out of the application.
     *
     * @return void
     */
    public function logout()
    {
        $refreshToken = $this->request->cookie('refresh_token');

        if (!$refreshToken) throw new UnauthorizedHttpException('Bearer', 'Unauthenticated.');

        $user = DB::table('tokens')
            ->leftJoin('users', 'users.id', '=', 'tokens.user_id')
            ->select([
                'users.id',
                'users.name',
                'users.email',
            ])
            ->where('refresh_token', $refreshToken)->first();

        if (!$user) throw new UnauthorizedHttpException('Bearer', 'Unauthenticated.');

        Token::where('user_id', $user->id)->delete();
    }

    /**
     * Create a new access token.
     *
     * @return string
     */
    public function refresh()
    {
        $refreshToken = $this->request->cookie('refresh_token');

        if (!$refreshToken) throw new UnauthorizedHttpException('Bearer', 'Unauthenticated.');

        $user = DB::table('tokens')
            ->leftJoin('users', 'users.id', '=', 'tokens.user_id')
            ->select([
                'users.id',
                'users.name',
                'users.email',
            ])
            ->where('refresh_token', $refreshToken)->first();

        if (!$user) throw new UnauthorizedHttpException('Bearer', 'Unauthenticated.');

        // Verify Refresh Token
        JWTHelpers::decode($refreshToken, config('auth.refresh_token_secret_key'));

        $payload = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
        ];
        $accessToken = JWTHelpers::encode($payload, config('auth.access_token_ttl'), config('auth.access_token_secret_key'));

        return $accessToken;
    }
}
