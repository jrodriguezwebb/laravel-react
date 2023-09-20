<?php

namespace Database\Seeders;

use App\Models\Order;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Order::insert([
            [
                'id_user' => 1,
                'order_number' => 1,
                'order_date' => '2023-09-20'
            ],
        ]);
    }
}
