<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    //

    public function events() {
        return $this->hasMany('App\Event', 'id', 'event_id');
    }

}
