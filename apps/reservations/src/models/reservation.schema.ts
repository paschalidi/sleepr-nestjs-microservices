import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {AbstractDocument} from "@app/common";

@Schema({versionKey: false})
export class ReservationDocument extends AbstractDocument {
    @Prop({required: true})
    timestamp: Date;
    @Prop({required: true})
    startDate: Date;
    @Prop({required: true})
    endDate: Date;
    @Prop({required: true})
    userId: string;
    @Prop({required: true})
    invoiceId: string;
}

export const ReservationSchema = SchemaFactory.createForClass(ReservationDocument);
