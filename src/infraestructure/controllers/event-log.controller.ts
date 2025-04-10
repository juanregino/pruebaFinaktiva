import { Body, Controller, Get, Inject, Post, Query } from "@nestjs/common";
import { GetEventUseCase } from "src/application/use-cases/get-event.use-case";
import { RegisterEventUseCase } from "src/application/use-cases/register-event.use-case";
import { CreateEventDto } from "../dto/create-event.dto";
import { FilterEventsDto } from "../dto/filter-events.dto";


@Controller('event-log')
export class EventLogController {
  constructor(
    @Inject('RegisterEventUseCase')
    private readonly registerEvent: RegisterEventUseCase,
    @Inject('GetEventUseCase')
    private readonly getEvent: GetEventUseCase,
  ) {
    console.log('fue injectado ', this.registerEvent);
  }

  @Post()
  async register(@Body() dto: CreateEventDto): Promise<void> {
    await this.registerEvent.execute(dto);
  }
  @Get()
  async find(@Query() query: FilterEventsDto) {
    return this.getEvent.execute(query);
  }
}