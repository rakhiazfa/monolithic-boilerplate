<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\Permission\Models\Role as SpetieRole;

class Role extends SpetieRole
{
    public function menus(): BelongsToMany
    {
        return $this->belongsToMany(Menu::class, 'role_has_menus', 'role_id', 'menu_id');
    }
}
