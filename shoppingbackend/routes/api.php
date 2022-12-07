<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\CommentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register',[UserController::class,'register']);
Route::post('login',[UserController::class,'login']);
Route::post('addItem',[ItemController::class,'addItem']);
Route::get('list',[ItemController::class,'list']);
Route::delete('delete/{id}',[ItemController::class,'delete']);
Route::get('item/{id}',[ItemController::class,'viewItem']);
Route::put('updateItem/{id}',[ItemController::class,'updateItem']);
Route::put('addMoney/{id}',[UserController::class,'addMoney']);
Route::get('getBalance/{id}',[UserController::class,'getBalance']);
Route::post('addComment',[CommentController::class,'addComment']);
Route::get('listComments/{item_id}', [CommentController::class, 'listComments']);
Route::delete('deleteComments/{item_id}',[CommentController::class,'deleteComments']);
Route::get('userItems/{user_id}',[ItemController::class,'userItems']);
Route::get('filter/{category}',[ItemController::class,'filter']);







