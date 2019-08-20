<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    //

    public function images() {
        return $this->hasMany('App\Image', 'event_id', 'id');
    }

    public function group() {
        return $this->belongsTo('App\Group', 'id', 'group_id');
    }
}
