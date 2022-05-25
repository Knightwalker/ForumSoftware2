<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    use HasFactory;
    protected $table = "topics";
    protected $fillable = [
        "name",
        "description",
        "forum_id",
        "user_id"
    ];

    public function posts() {
        return $this->hasMany(Post::class, "topic_id", "id");
    }

    public function user() {
        return $this->hasOne(User::class, "id", "user_id");
    }
    
}
