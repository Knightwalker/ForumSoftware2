<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('forums', function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->bigInteger("parent_id")->unsigned()->nullable();
            $table->string("type");
            $table->string("name");
            $table->string("description");
            $table->integer("user_id");
            $table->string("image_url");

            $table->foreign("parent_id")->references("id")->on("forums")->onDelete("restrict");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('forums');
    }
};
