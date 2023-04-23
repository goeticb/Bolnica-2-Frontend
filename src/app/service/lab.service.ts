import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateLabExamRequest, CreateReferralRequest } from '../dto/request/laboratory.request';
import { LabExamResponse, ReferralResponseList, ReferralResponse } from '../dto/response/laboratory.response';
import { LAB_URL } from '../app.constants';

@Injectable({
    providedIn: 'root'
})
export class LabService {
    constructor(private httpClient: HttpClient) {
    }

    createLabExamination(createLabExamRequest: CreateLabExamRequest) {
        return this.httpClient.post<LabExamResponse>(LAB_URL + '/examination/create', createLabExamRequest, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
    }

    getLabExaminationCount(date: string) {
        return this.httpClient.get(LAB_URL + '/examination/scheduled-count', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                date: date
            }
        })
    }

    getUnprocessedReferrals(lbp: string) {
        return this.httpClient.get<ReferralResponseList>(LAB_URL + '/referral/unprocessed', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                lbp: lbp
            }
        })
    }

    createReferral(createReferralRequest: CreateReferralRequest) {
        return this.httpClient.post<ReferralResponse>(LAB_URL + '/referral/create', createReferralRequest, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
    }

    getReferralHistory(lbp: string, startDate: string, endDate: string, page: number, size: number) {
        const params: any = {};
        params.lbp = lbp;
        if (startDate === '') params.startDate = '1970-01-01T23:59:20.253Z'; else params.startDate = startDate + 'T00:00:00.253Z';
        if (endDate === '') params.endDate = '2500-04-23T11:16:20.253Z'; else params.endDate = endDate + 'T00:00:00.253Z';
        return this.httpClient.get<ReferralResponseList>(LAB_URL + '/referral/history', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                lbp: params.lbp,
                dateFrom: params.startDate,
                dateTo: params.endDate,
                page: page,
                size: size
            }
        })
    }

    deleteReferral(id: number) {
        return this.httpClient.delete<ReferralResponse>(LAB_URL + `/referral/delete/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
    }
}