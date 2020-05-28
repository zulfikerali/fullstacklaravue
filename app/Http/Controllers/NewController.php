<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NewController extends Controller
{
    public function newpage()
    {
        return response()->json([
            'msg'=> 'we should return json'
        ]);
    }

    public function test()
    {
        return response()->json([
            'msg'=> 'we should return json'
        ]);
    }
}
