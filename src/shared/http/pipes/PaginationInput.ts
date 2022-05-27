import { Field, InputType } from '@nestjs/graphql';

@InputType()
class PaginationInput {
  @Field({ nullable: true, defaultValue: 1 })
  page?: number;

  @Field({ nullable: true, defaultValue: 10 })
  amount?: number;
}

type PaginationOutput = {
  take: number;
  skip: number;
};

export { PaginationInput, PaginationOutput };
