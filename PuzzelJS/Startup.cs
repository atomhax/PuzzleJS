using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(PuzzelJS.Startup))]
namespace PuzzelJS
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
