import { Module } from "@nestjs/common";
import { CheckoutController } from "./checkout.controller";
import { CheckoutService } from "./checkout.service";
import { CartModule } from "~routes/3-carts/cart.module";
import { DiscountModule } from "~routes/6-discounts/discount.module";
import { LockService } from "~routes/4-checkouts/lock.service";
import { InventoryModule } from "~routes/5-inventories/inventory.module";
import { OrderModule } from "~routes/7-orders/order.module";

@Module({
	imports: [CartModule, DiscountModule, InventoryModule, OrderModule],
	controllers: [CheckoutController],
	providers: [CheckoutService, LockService],
	exports: [CheckoutService],
})
export class CheckoutModule {}
