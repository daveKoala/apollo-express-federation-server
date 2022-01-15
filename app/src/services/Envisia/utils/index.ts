
export const rtnRaterDetails = (bol: boolean): string => {
  return `include_rater_detail=${bol}`;
};

export const projectId = (id: string): string => {
  return `project_id=${id}&`;
};

export const email = (email: string): string => {
  return `email=${email}&`;
}

export const projectIds = (ids: (string | number)[]): string => {
  const projectIdQueryString = ids.reduce((acc, id) => {
    acc = acc + `project_ids[]=${id}&`;
    return acc;
  }, '');

  return projectIdQueryString as string;
};

export const apiKey = (key: string): string => {
  return `api_key=${key}&`;
};

export const emailArray = (emails: string[]): string => {
  // emails[]=awaistest@test.com'

  const emailQueryString = emails.reduce((acc, email) => {
    acc = acc + `emails[]=${email}&`;
    return acc;
  }, '');

  return emailQueryString;
};
