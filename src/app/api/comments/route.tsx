import { NextResponse, NextRequest } from 'next/server'
import { getIssueComments, IGitHubCommentsResponse } from '@/util/GitHub/issues';
import { ErrorWithHTTPCode } from '@/util/errors';

export async function GET(request: NextRequest) {

    const params = new URL(request.url).searchParams;

    const id: number = parseInt(params.get('id') || '');

    if (isNaN(id)) return NextResponse.json({}, { status: 400, statusText: 'Bad Request' })


    console.log('Params', params, id);

    let issue: IGitHubCommentsResponse;
    
    try {
        issue = await getIssueComments(id);
    }
    catch(err) {
        console.log('Error', err)
        const httpErr = err as ErrorWithHTTPCode;
        return NextResponse.json({}, { status: httpErr.code, statusText: httpErr.message })
    }



    return NextResponse.json(issue)
}