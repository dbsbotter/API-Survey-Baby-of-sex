import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Survey from '../models/Survey';
import surveyRepository from '../repositories/SurveyRepository';

interface Request {
  id: string;
  pick: string;
}

class UpdateSurveyPickService {
  public async execute({ id, pick }: Request): Promise<Survey> {
    const surveysRepository = getCustomRepository(surveyRepository);

    const survey = await surveysRepository.findOne(id);

    if (!survey) {
      throw new AppError('Not found Survey', 404);
    }

    if (survey.pick) {
      throw new AppError('Your picked has already been saved');
    }

    survey.pick = pick;

    await surveysRepository.save(survey);

    return survey;
  }
}

export default UpdateSurveyPickService;
