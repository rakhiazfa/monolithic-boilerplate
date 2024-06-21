<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MenuResource extends JsonResource
{
    /**
     * @var string
     */
    public static $wrap = 'menu';

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'href' => $this->href,
            'order' => $this->order,
            'parent_id' => $this->parent_id,
            'children' => $this->whenLoaded('children', function () {
                return $this->children;
            }),
        ];
    }
}
