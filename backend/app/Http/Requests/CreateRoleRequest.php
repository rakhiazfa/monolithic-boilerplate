<?php

namespace App\Http\Requests;

use App\Http\FormRequest;

class CreateRoleRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'unique:roles'],
            'permissions' => ['array'],
            'permissions.*' => ['required', 'numeric'],
        ];
    }
}
