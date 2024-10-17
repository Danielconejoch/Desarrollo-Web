using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace HelloWorldDotNet.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HelloWorldController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<string>> Get()
        {
            return await Task.FromResult("¡Hola mundo!");
        }
    }
}
