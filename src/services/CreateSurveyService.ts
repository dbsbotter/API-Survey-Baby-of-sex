import { getCustomRepository } from 'typeorm';
import { BitlyClient } from 'bitly';
import bitlyConfig from '../config/bitly';

import Survey from '../models/Survey';
import surveyRepository from '../repositories/SurveyRepository';

interface Request {
  user_id: string;
  person_name: string;
}

class CreateSurveyService {
  public async execute({ user_id, person_name }: Request): Promise<Survey> {
    const surveysRepository = getCustomRepository(surveyRepository);

    const survey = surveysRepository.create({
      user_id,
      person_name,
    });

    await surveysRepository.save(survey);

    const bitly = new BitlyClient(bitlyConfig.token, {});

    const url = `${process.env.APP_URL}/pick/${survey.id}`;

    const responseLink = await bitly.shorten(url);

    survey.url_bitly = responseLink.link;

    await surveysRepository.save(survey);

    return survey;
  }
}

export default CreateSurveyService;
