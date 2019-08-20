<?php

use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ImagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('images')->insert([
            'uri' => Str::random(10),
            'public' => true,
            'height' => 300,
            'width' => 200,
            'event_id' => 1
        ]);
        DB::table('images')->insert([
            'uri' => Str::random(10),
            'public' => true,
            'height' => 300,
            'width' => 200,
            'event_id' => 1
        ]);
        DB::table('images')->insert([
            'uri' => Str::random(10),
            'public' => true,
            'height' => 300,
            'width' => 200,
            'event_id' => 1
        ]);
    }
}
