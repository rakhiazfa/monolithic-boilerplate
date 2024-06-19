<?php

namespace App\Http;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest as HttpFormRequest;

class FormRequest extends HttpFormRequest
{
    /**
     * Handle a failed validation attempt.
     *
     * @param  \Illuminate\Contracts\Validation\Validator  $validator
     * @return void
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function failedValidation(Validator $validator)
    {
        $errorMessages = $validator->errors()->messages();
        $firstErrors = [];

        foreach ($errorMessages as $field => $messages) {
            $validator->getMessageBag()->forget($field);
            $firstErrors[$field] = $messages[0];
        }

        $validator->getMessageBag()->merge($firstErrors);

        $exception = $validator->getException();

        throw (new $exception($validator))
            ->errorBag($this->errorBag)
            ->redirectTo($this->getRedirectUrl());
    }
}
