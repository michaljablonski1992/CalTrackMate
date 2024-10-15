export async function fetchFoodData(query: string): Promise<any> {
  try {
    const response = await fetch(`/api/fatsecret?query=${query}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch from backend');
    }

    const data = await response.json();
    console.log('Response from fatsecret API:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}