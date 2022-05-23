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
}
