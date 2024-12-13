using System.Text.Json;

namespace crud_asp.web.Helpers
{
    public static class HttpClientExt
    {
        public static async Task<T> ReadContentAsync<T>(this HttpResponseMessage response)
        {
            if (response.IsSuccessStatusCode)
                throw new ApplicationException($"Ocurrio un error al llamar api: {response.ReasonPhrase}");
            var dataAsString = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
            var result = JsonSerializer.Deserialize<T>(dataAsString, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
            return result;

        }
    }
}
