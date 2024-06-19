<?php

namespace App\Observers;

use Illuminate\Database\Eloquent\Model;

class SignatureObserver
{
    public function creating(Model $model)
    {
        if (!app()->runningInConsole() && auth()->check()) {
            $model->created_by = auth()->id();
            $model->updated_by = auth()->id();
            $model->user_location = request()->ip();
        }
    }

    public function updating(Model $model)
    {
        if (!app()->runningInConsole() && auth()->check()) {
            $model->updated_by = auth()->id();
            $model->user_location = request()->ip();
        }
    }

    public function deleting(Model $model)
    {
        if (!app()->runningInConsole() && auth()->check()) {
            $model->deleted_by = auth()->id();
            $model->user_location = request()->ip();
        }
    }
}
