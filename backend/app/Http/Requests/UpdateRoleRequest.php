<?php

namespace App\Http\Requests;

use App\Http\FormRequest;

class UpdateRoleRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $roleId = $this->route('id');

        return [
            'name' => ['required', 'unique:roles,name,' . $roleId],
            'permissions' => ['array'],
            'permissions.*' => ['required', 'numeric'],
            'menus' => ['array'],
            'menus.*' => ['required', 'numeric'],
        ];
    }
}
