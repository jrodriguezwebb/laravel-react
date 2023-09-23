<?php

namespace Database\Seeders;

use App\Models\OrderDetail;
use Illuminate\Database\Seeder;

class OrderDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        OrderDetail::insert([
            [
                'order_id' => 1,
                'id_product' => 1,
                'quantity' => 1,
                'amount' => 1.20,
            ],
            [
                'order_id' => 1,
                'id_product' => 2,
                'quantity' => 1,
                'amount' => 1.40,
            ],
        ]);
    }
}
