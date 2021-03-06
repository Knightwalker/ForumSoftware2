<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    protected $table = "posts";
    protected $fillable = [
        "name",
        "content",
        "topic_id",
        "user_id"
    ];

    public function user() {
        return $this->hasOne(User::class, "id", "user_id");
    }
}
