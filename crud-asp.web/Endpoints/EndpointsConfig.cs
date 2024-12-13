using crud_asp.web.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace crud_asp.api.Endpoints
{
    public class EndpointsConfig
    {
        public static void AddEndpoints(WebApplication app)
        {
            app.MapGet("api/get_users", async () =>
            {
                var result = "";
                try
                {
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
                }
                catch (Exception ex)
                {
                    result = ex.ToString();
                }
                result = result.Substring(0, result.Length - 2);
                return Results.Ok(result);
            });
            app.MapPost("api/save", async (string clave, string nombre, string sexo, string contraseña) =>
            {
                var result = "";
                try
                {
                    using (var connection = new MySqlConnection("Server=localhost;Database=formulario;Uid=root;Pwd=huevo123;"))
                    {
                        await connection.OpenAsync();
                        var command = new MySqlCommand("INSERT INTO registros (clave, nombre, sexo, password) VALUES (@clave, @nombre, @sexo, @password)", connection);
                        command.Parameters.AddWithValue("@clave", clave);
                        command.Parameters.AddWithValue("@nombre", nombre);
                        command.Parameters.AddWithValue("@sexo", sexo);
                        command.Parameters.AddWithValue("@password", contraseña);
                        await command.ExecuteNonQueryAsync();
                    }
                    result = "Registro guardado exitosamente.";
                }
                catch (Exception ex)
                {
                    result = ex.ToString();
                }
                return Results.Ok(result);
            });

            app.MapPost("api/update", async (int idu, string claveu, string nombreu, string sexou, string contraseñau) =>
            {
                var result = "";
                try
                {
                    using (var connection = new MySqlConnection("Server=localhost;Database=formulario;Uid=root;Pwd=huevo123;"))
                    {
                        await connection.OpenAsync();
                        var command = new MySqlCommand("UPDATE registros SET clave = @clave, nombre = @nombre, sexo = @sexo, password = @password WHERE id = @id", connection);
                        command.Parameters.AddWithValue("@clave", claveu);
                        command.Parameters.AddWithValue("@nombre", nombreu);
                        command.Parameters.AddWithValue("@sexo", sexou);
                        command.Parameters.AddWithValue("@password", contraseñau);
                        command.Parameters.AddWithValue("@id", idu);
                        await command.ExecuteNonQueryAsync();
                    }
                    result = "Registro actualizado exitosamente.";
                }
                catch (Exception ex)
                {
                    result = ex.ToString();
                }
                return Results.Ok(result);
            });

            app.MapPost("api/delete", async (int idd) =>
            {
                var result = "";
                try
                {
                    using (var connection = new MySqlConnection("Server=localhost;Database=formulario;Uid=root;Pwd=huevo123;"))
                    {
                        await connection.OpenAsync();
                        var command = new MySqlCommand("DELETE FROM registros WHERE Id = @Id", connection);
                        command.Parameters.AddWithValue("@id", idd);
                        await command.ExecuteNonQueryAsync();
                    }
                    result = "Registro eliminado exitosamente.";
                }
                catch (Exception ex)
                {
                    result = ex.ToString();
                }
                return Results.Ok(result);
            });

            app.MapGet("api/log", async (HttpContext context) =>
            {
                var user = context.Session.GetString("userasp") ?? "unauthorized";
                return Results.Ok(user);
            });

            app.MapPost("api/login", async (HttpContext context, string clavel, string contraseñal) =>
            {
                var result = "";
                try
                {
                    using (var connection = new MySqlConnection("Server=localhost;Database=formulario;Uid=root;Pwd=huevo123;"))
                    {
                        await connection.OpenAsync();
                        var command = new MySqlCommand("SELECT * FROM registros WHERE clave = @clave AND password = @password", connection);
                        command.Parameters.AddWithValue("@clave", clavel);
                        command.Parameters.AddWithValue("@password", contraseñal);
                        using (var reader = command.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                result += reader.GetString("clave");
                                context.Session.SetString("userasp", result);
                                context.Response.Cookies.Append("userasp", result, new CookieOptions
                                {
                                    Expires = DateTimeOffset.Now.AddDays(1),
                                    HttpOnly = true,
                                    Secure = true
                                });
                            }
                            else
                            {
                                result = "unauthorized";
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    result = ex.ToString();
                }
                return Results.Ok(result);
            });

            app.MapGet("api/logout", async (HttpContext context) =>
            {
                context.Session.Remove("userasp");
                context.Session.Clear();
                context.Response.Cookies.Delete("userasp");
            });

        }
    }
}
