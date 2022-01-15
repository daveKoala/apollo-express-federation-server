import { Request, Response, Router, NextFunction } from 'express';
import {
  OTPRequestBody,
  ProjectIds,
  RaterStatusRequestBody,
  StatusRequestBody,
} from './types';
import {
  apiKey,
  email,
  emailArray,
  projectId,
  projectIds,
  rtnRaterDetails,
} from './utils';
import { validateRequestBody } from './middleware';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, { AxiosError } from 'axios';
import * as yup from 'yup';

const assessmentsStatusRequestBody = yup.object().shape({
  emails: yup.array().of(yup.string()).required(),
  projectId: yup.string().required(),
  includeRaterDetails: yup.boolean().required(),
});

const ProjectsRequestBody = yup.object().shape({
  projectIds: yup.array().of(yup.string()).nullable(),
});

const ratersStatusRequestBody = yup.object().shape({
  email: yup.string().required(),
  projectIds: yup.array().of(yup.string()).required(),
});

const otrRequestBody = yup.object().shape({
  email: yup.string().required(),
});

const router = Router();

router.post(
  '/assessments/status',
  validateRequestBody(assessmentsStatusRequestBody),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const routeUrl = 'https://cirrus.test.assessmenthub.net/api/strata/v1';
      const body = req.body as StatusRequestBody;
      const url =
        routeUrl +
        `/assessments/status?` +
        apiKey('y7z1YasPa3uJsnHyZHa3Eg') +
        emailArray(body.emails) +
        projectId(body.projectId) +
        rtnRaterDetails(body.includeRaterDetails || true);

      const request = await axios({
        method: 'POST',
        url,
        responseType: 'json',
      });

      res.status(200).json({ ...request.data });
    } catch (error: unknown | AxiosError) {
      if (axios.isAxiosError(error)) {
        res
          .status(error.response?.status || 400)
          .json({ ...error.response?.data });
      } else {
        next(error);
      }
    }
  }
);

router.post(
  '/projects',
  validateRequestBody(ProjectsRequestBody),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const routeUrl = 'https://cirrus.test.assessmenthub.net/api/strata/v1';
      const body = req.body as ProjectIds;
      const url =
        routeUrl +
        `/projects?` +
        apiKey('y7z1YasPa3uJsnHyZHa3Eg') +
        projectIds(body.projectIds);

      const { data } = await axios({
        method: 'POST',
        url,
        responseType: 'json',
      });

      res.status(200).json({ ...data });
    } catch (error: unknown | AxiosError) {
      if (axios.isAxiosError(error)) {
        res
          .status(error.response?.status || 400)
          .json({ ...error.response?.data });
      } else {
        next(error);
      }
    }
  }
);

router.post(
  '/raters/status',
  validateRequestBody(ratersStatusRequestBody),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const routeUrl = 'https://cirrus.test.assessmenthub.net/api/strata/v1';
      const body = req.body as RaterStatusRequestBody;
      const url =
        routeUrl +
        `/raters/status?` +
        apiKey('y7z1YasPa3uJsnHyZHa3Eg') +
        email(body.email) +
        projectIds(body.projectIds);

      const request = await axios({
        method: 'POST',
        url,
        responseType: 'json',
      });

      res.status(200).json({ ...request.data });
    } catch (error: unknown | AxiosError) {
      if (axios.isAxiosError(error)) {
        res
          .status(error.response?.status || 400)
          .json({ ...error.response?.data });
      } else {
        next(error);
      }
    }
  }
);

router.post(
  '/users/generate_otp',
  validateRequestBody(otrRequestBody),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const routeUrl = 'https://cirrus.test.assessmenthub.net/api/strata/v1';
      const body = req.body as OTPRequestBody;
      const url =
        routeUrl +
        `/users/generate_otp?` +
        apiKey('y7z1YasPa3uJsnHyZHa3Eg') +
        email(body.email);

      const request = await axios({
        method: 'POST',
        url,
        responseType: 'json',
      });

      res.status(200).json({ ...request.data });
    } catch (error: unknown | AxiosError) {
      if (axios.isAxiosError(error)) {
        res
          .status(error.response?.status || 400)
          .json({ ...error.response?.data });
      } else {
        next(error);
      }
    }
  }
);

export default router;
