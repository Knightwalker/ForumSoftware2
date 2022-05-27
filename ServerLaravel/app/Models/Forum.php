<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Forum extends Model
{
    use HasFactory;
    protected $table = "forums";
    protected $fillable = [
        "parent_id",
        "type",
        "name",
        "description",
        "user_id",
        "image_url"
    ];

    public function children() {
        return $this->hasMany(Forum::class, "parent_id", "id");
    }

    public function topics() {
        return $this->hasMany(Topic::class, "forum_id", "id");
    }

    public function posts() {
        return $this->hasManyThrough(Post::class, Topic::class);
    }

    public function user() {
        return $this->hasOne(User::class, "id", "user_id");
    }

}
