import { Controller, Get, Inject } from "@nestjs/common";

import { job_posting_service } from "../services/job_posting_service";

@Controller("job_posting")
export class job_posting_controller{
   // Correct token name
    // Inject the service into the controller's constructor
  constructor(
    private readonly job_posting_service: job_posting_service) {}

  @Get()
  async findAll() {
    // Call the service's findAll method
    console.log(this.job_posting_service)
    return await this.job_posting_service.findAll();
  }
}