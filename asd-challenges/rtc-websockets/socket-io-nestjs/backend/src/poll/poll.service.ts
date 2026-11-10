import { Injectable } from '@nestjs/common';

@Injectable()
export class PollService {
  /*
  private tallies: Record<string, number> = {};

  addVote(pollId: string, option: string) {
    this.tallies[option] = (this.tallies[option] ?? 0) + 1;
    return this.tallies;
  }
	*/

  private tallies: Record<string, Record<string, number>> = {};

  addVote(pollId: string, option: string) {
    this.tallies[pollId] ??= {}; // create if it doesnt exist

    this.tallies[pollId][option] = (this.tallies[pollId][option] ?? 0) + 1;
    return this.tallies[pollId];
  }
}
