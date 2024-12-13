using MySql.Data.MySqlClient;

namespace crud_asp.api.Endpoints
{
    public class EndpointsConfig
    {
        public static void AddEndpoints(WebApplication app)
        {
            app.MapGet("api/getUsers", async () =>
            {
                var result = "";
                using (var connection = new MySqlConnection("Server=localhost;Database=formulario;Uid=root;Pwd=huevo123;"))
                {
                    await connection.OpenAsync();
                    var command = new MySqlCommand("SELECT * FROM registros", connection);
                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            result += reader.GetInt32("id") + ",";
                            result += reader.GetString("clave") + ",";
                            result += reader.GetString("nombre") + ",";
                            result += reader.GetString("sexo") + ",";
                            result += reader.GetString("password") + ",";
                            result += ";";

                        }
                    }
                }
                result = result.Substring(0, result.Length-2);
                return Results.Ok(result);
            });
        }
    }
}
