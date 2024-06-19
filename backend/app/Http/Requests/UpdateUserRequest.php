<?php

namespace App\Http\Requests;

use App\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $userId = $this->route('id');

        return [
            'name' => ['required'],
            'email' => ['required', 'email', 'unique:users,email,' . $userId],
            'password' => ['required', 'min:8', 'confirmed'],
            'roles' => ['array'],
            'roles.*' => ['required', 'numeric'],
        ];
    }
}
