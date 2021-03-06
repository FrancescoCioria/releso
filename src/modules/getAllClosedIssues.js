import { github } from '../utils';

let closedIssues = null;

const getAllClosedIssues = async (acc = [], issues) => {
  if (!issues) {
    const firstPage = await github.issues.fetch({ state: 'closed', limit: 100 });
    return getAllClosedIssues(acc.concat(firstPage), firstPage);
  } else if (issues.nextPage) {
    const nextPage = await issues.nextPage();
    return getAllClosedIssues(acc.concat(nextPage), nextPage);
  } else {
    return acc.filter(i => !i.pullRequest); // filter out PRs
  }
};

export default async () => {
  closedIssues = closedIssues || await getAllClosedIssues();
  return closedIssues;
};
