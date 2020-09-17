import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import asyncHandler from 'express-async-handler';

import surveyRepository from '../repositories/SurveyRepository';
import CreateSurveyService from '../services/CreateSurveyService';
import UpdateSurveyPickService from '../services/UpdateSurveyPickService';

import ensureAuth from '../middlewares/ensureAuthenticated';

const surveyRoutes = Router();

surveyRoutes.get(
  '/',
  asyncHandler(async (request, response) => {
    const surveysRepository = getCustomRepository(surveyRepository);

    const surveys = await surveysRepository.find();

    return response.json(surveys);
  }),
);

surveyRoutes.post(
  '/',
  ensureAuth,
  asyncHandler(async (request, response) => {
    const { id } = request.user;

    const { person_name } = request.body;

    const createSurvey = new CreateSurveyService();

    const survey = await createSurvey.execute({
      user_id: id,
      person_name,
    });

    return response.json(survey);
  }),
);

surveyRoutes.patch(
  '/:id',
  asyncHandler(async (request, response) => {
    const { id } = request.params;
    const { pick } = request.body;

    const updateSurveyPick = new UpdateSurveyPickService();

    const survey = await updateSurveyPick.execute({
      id,
      pick,
    });

    return response.json(survey);
  }),
);

export default surveyRoutes;
