import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayableDto } from './create-playable.dto';

export class UpdatePlayableDto extends PartialType(CreatePlayableDto) {}
