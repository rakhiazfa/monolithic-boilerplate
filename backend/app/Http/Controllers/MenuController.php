<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateMenuRequest;
use App\Http\Requests\UpdateMenuRequest;
use App\Http\Resources\MenuCollection;
use App\Http\Resources\MenuResource;
use App\Services\MenuService;

class MenuController extends Controller
{
    public function __construct(private MenuService $menuService)
    {
        // 
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $menus = $this->menuService->findAll();

        return new MenuCollection($menus);
    }

    /**
     * Search the specified resource.
     */
    public function search()
    {
        $menus = $this->menuService->search();

        return new MenuCollection($menus);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateMenuRequest $request)
    {
        $this->menuService->create($request);

        return response()->json([
            'message' => 'Successfully created a new menu.',
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $menu = $this->menuService->findById($id);

        return new MenuResource($menu);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMenuRequest $request, string $id)
    {
        $this->menuService->update($request, $id);

        return response()->json([
            'message' => 'Successfully updated menu.',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->menuService->delete($id);

        return response()->json([
            'message' => 'Successfully deleted menu.',
        ]);
    }
}
