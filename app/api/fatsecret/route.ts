import { NextResponse } from 'next/server';
import { getAccessToken } from './_utils';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query'); // Example of query params
    const accessToken = await getAccessToken();

    const response = await fetch(`https://platform.fatsecret.com/rest/foods/search/v3?format=json&search_expression=${query}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch from Fatsecret API' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}