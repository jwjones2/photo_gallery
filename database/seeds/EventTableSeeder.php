<?php

use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EventTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('events')->insert([
            'name' => Str::random(10),
            'description' => Str::random(100),
            'event_date' => '2019-12-24',
            'group_id' => 1
        ]);
        DB::table('events')->insert([
            'name' => Str::random(10),
            'description' => Str::random(100),
            'event_date' => '2016-10-22',
            'group_id' => 1
        ]);
    }
}
