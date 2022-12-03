<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    function register(Request $req) {
        $user = new User;
        $user->username = $req->input('username');
        $user->password = Hash::make($req->input('password'));
        $user->save();
        return $user;
    }
    function login(Request $req) {
        $user = User::where('username', $req->username)->first();
       if(!$user || !Hash::check($req->password, $user->password)){
            return ["username"=>"error", "error" => "username or password is not correct"];
       }
        return $user;
    }

    function updateUserItems(Request $req) {
        $user = User::where('username', $req->username)->first();
        
    }
}
