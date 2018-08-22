export class Report {
    id: number;
    reporterId: number;
    reporterUsername: string;
    reportedUserId: number;
    reportedUsername: string;
    reportedAdId: number;
    reportedAdTitle: string;
    reportText: string;
    timestamp: string;
    handled: boolean;
}
