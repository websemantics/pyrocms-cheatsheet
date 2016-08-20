```                         

                                                               +
                                                               /\
                                                              //:\
                                                             //\\\\                        _
                                                            ///\\\'\                      /,\_
                                                    +      /// \\\\\\                    (____)
                                                    /\    //''//\\ \.\                   (
   __   __   __   __                               //\\  /// ///\\\\\\\                 /
  |: | |''| |' | |  |                             ///\\\//////.|. \\ .\\               '
  |                 |                            ///;:\\\\\\///.|.\\\\ \:\   
  |:                :                             |:    |//////||\\\:\\\\'\
  |:   . .          | \    __  __  __     __   _  |:    ://;//,..';\\'\\\\\\
   \  - - ----- -  /   |__|' ||: ||  |_ _|  :_: |_|                     |   
    | --- - -     |                               |              [ ]   :|       
    |:                                            |    --- - -         :|  __   __   __   __   __   __    _
_ _ :                                                                   |_|: | /: | |  | |: | |  \.|' |_ |
    |            ____ _ _ _   __ _ ___     ___ _ _   _____ _ _ __       |
    |           | ,         \ \  '    \   /  ' ' /  |:           \\     :                   |
    |                ,-.     | \       \ /      /   |    ,-.      |                         |     
                |    |__)    |  \\      V      /    |    |__)     |                                       
                |:      ____/    \            /     |:           <                __       .              |
    |           |      ||         |:         |      |:     |\     \              /  |     / \             :
                |       |         |   ['_]:  |      |      | \     \     |\     |    \_,-/   |
    :           |_ _  __|         |_ _ ____. |      |  __ _|  \ ____\    | ` __  \    (      /            |
                                                                          \/   \  ''-.  `__,'             |
    |             |                                                       /    /      \    \          
    |                   (           (                      )              |   |        |   |             
    |             (          )          )      )         (                \    \      /    /
                 ____) _ ___  __ _____ (___  _  _ ___ ___ _____            \    `-..-'    /
                / _/ || | __|/  \_   _/' _/| || | __| __|_   _|   <------\  '-_   __ / __  \
               | \_| >< | _|| /\ || | `._`.| >< | _|| _|  | |      <------+===())))==)  ) /===========
                \__/_||_|___|_||_||_| |___/|_||_|___|___| |_|     <------/    `--' `.__,'


          ⎯ ⎯⎯ ⎯⎯⎯⎯⎯ ∈   A list of commands and features for PyroCMS 3 ⎯⎯⎯⎯⎯⎯ ⎯⎯ ⎯

```              

> This document has the full list of commands, code samples and best use practices for PyroCMS 3 development under different categories. You can also try the **[Live App](http://websemantics.github.io/pyrocms-cheatsheet)** for an enhanced user experience.


## Table of Contents

- [Cheatsheets](#cheatsheets)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Settings](#settings)
  - [Artisan](#artisan)
  - [Pyro Magic](#pyro-magic)
  - [Views](#views)
  - [Twig](#twig)
- [Development](#development)
  - [Install](#install)
  - [Build](#build)
  - [Watch](#watch)
- [Related](#related)
- [Contribution](#contribution)
- [Credits](#credits)
- [License](#license)


## Cheatsheets

### Installation

```bash
# Use 'create-project' command to install PyroCMS
composer create-project pyrocms/pyrocms folder_name
# Use '--prefer-source' flag for Windows environment
composer create-project pyrocms/pyrocms --prefer-dist
# Enable write permissions for some folders
sudo chmod -R 777 path_to/pyrocms/storage
sudo chmod -R 777 path_to/pyrocms/public/assets
sudo chmod -R 777 path_to/pyrocms/bootstrap/cache
# Or change pyrocms folder ownership
sudo chown -R user:admin path_to/pyrocms
# Install Stream from command line
./artisan install:streams
```


### Configuration

```php
// Overrid Streams Platform configuration values at
path_to/pyrocms/config/streams
// Available config files for Streams located at
path_to/pyrocms/vendor/anomaly/streams-platform
/resources/config
// Set application environment in .env, 'local'
// 'staging' or 'production'
APP_ENV = local
// Edit .env config file to enable debug mode
APP_DEBUG = true
// Get current env variable in php
$env = App::environment();
$env = app()->environment();
// Use config helper to access configuration values
$value = config('app.locale');
// Set configuration values through config helper
config(['app.locale' => 'fr']);
// Get core configuration values
$value = config('streams::assets.paths');
// Get Addon configuration, 'name' module
$value = config('vendor.module.slug::name.key');
```


### Settings

```php
// To read a value from the settings module inject
// Anomaly\SettingsModule\Setting\Contract\SettingRepositoryInterface
// into your class method then read the require field
function index(SettingRepositoryInterface $settings)
{
    $val = $settings->value(
    'vendor.module.slug::field_name','default'));
}
```


### Artisan

```bash
# Combine all configuration files into a single file
php artisan config:cache
# Enable maintenance mode
php artisan down
# Disable maintenance mode
php artisan down
# Set application key
php artisan key:generate

********* CACHE ********* 

# Clear the cache for assets
php artisan asset:clear
# Clear the cache for views
php artisan view:clear
# Clear the cache for twig
php artisan twig:clean

********* STREAMS ********* 

# Create a stream migration (fields or stream)
php artisan make:migration create_stream_fields
--addon=vendor.module.slug

********* ADDONS ********* 

# Create a theme
php artisan make:addon vendor.theme.slug
# Create a shared theme
php artisan make:addon vendor.theme.slug --shared
# Create a plugin
php artisan make:addon vendor.plugin.slug

********* MODULES ********* 

# Create a module WITH the builder Extension, add '--shared' for shared
php artisan make:module vendor slug

# Create a module WITHOUT Builder Extension, add '--shared' for shared
php artisan make:addon ventor.module.slug

# Install, uninstall and reinstall a module
php artisan module:install vendor.module.slug
php artisan module:uninstall vendor.module.slug
php artisan module:reinstall vendor.module.slug
# Seed the module's streams / entities
php artisan db:seed --addon=vendor.module.slug

********* ENITITIES ********* 

# Create a stream entity. This will create a stream
# migratiom, and an entity folder inside the addon's
# 'src' folder.
php artisan make:stream stream_slug
ventor.addon_type.addon_slug

********* MIGRATION ********* 

# Manage migrations manually
php artisan migrate --addon=vendor.module.slug
php artisan migrate:reset --addon=vendor.module.slug
php artisan migrate:refresh --addon=vendor.module.slug
```


### Pyro Magic

```bash
#Your own Builder, add to bindings in service provider
protected $bindings = [
    'login' => 'Vendor\CoolNameModule\Your\Namespace\LoginFormBuilder',
];
#Render with
{{ form('login') }}

#Form based on Streams (no builder required)
{{ form({'stream': slug, 'namespace': farts}).buttons(['cancel']).redirect('foo/bar').successMessage('You are da winner!') }}
```


### Views

```php
// Return a view using 'view' helper function.
// Views are location at: path_to/pyrocms/addons/
// shared/vendor/name-module/resources/views
return view('vendor.module.slug::page',
['title' => 'app']);
// Return a view from nested folder 'admin'
return view('vendor.module.slug::admin.page', []);
// Check if a view exists
if (view()->exists('vendor.module.slug::page')) {}
// Return a view from active theme
return view('theme::page', $data);
// Return a view from active module
return view('module::page', $data);
// Passing $data as an array with key/value pairs
return view('module::page', ['name','Jo']);
// Passing individual key/value using 'with' method
return view('module::page')->with('name','Jo');
// Share data with all views. Place in Service
// Provider's 'boot' method
view()->share('key', 'value');
// To override core pyro views, insert this in your
// module's service provider. The example below will
// override the user login form with a view in your
// module's resources folder:
// 'resources\views\users\login.twig'
protected $overrides = [
   'anomaly.module.users::login' =>
            'vendor.module.slug::core/users/login'
];
// Override the form view directly from plugin call
{{ login_form({'options': {'form_view':
'vendor.module.slug::streams/form/form'}}) }}
```


### Twig

```php
// Loop through files
{% for file in entry.example %}
    File {{ loop.index }} is a {{ file.mime_type }}.
{% endfor %}
// Insert image from the current theme
{{ image_url('theme::img/image.png') }}
// Embed a view partial
{{ view("vendor.module.slug::partials/file") }}
// Granular control over forms; user login form
// as an example which shows how to add custom
// CSS classes to the form and input elements.
{% set form = login_form() %}
{{ form.open({'class' : 'ui form'}) |raw }}
{% for field in form.fields %}
 &lt;div class="field"&gt;
  &lt;label&gt;{{ field.label|raw }}&lt;/label&gt;
  {{ field.setClass('custom class').input|raw }}
 &lt;/div&gt;
{% endfor %}
{{ form.actions |raw }}
{{ form.close() |raw }}
```


## Development

If you want to make code contribution, or use this code for your own project, here are some of the commands included in `package.json` to get you started.


### Install

Clone this repo and install node dependencies

``` bash
npm install
```


### Build

``` bash
npm run build
```


### Watch

``` bash
npm run watch
```


## Related

[PyroCMS](https://github.com/pyrocms/pyrocms), an MVC PHP Content Management System built to be easy to use, theme and develop with. It is used by individuals and organizations of all sizes around the world.

[Awesome PyroCMS](https://github.com/websemantics/awesome-pyrocms), a curated list of PyroCMS addons and resources.

[Entity Builder](https://github.com/websemantics/entity_builder-extension), scaffold your PyroCMS apps in style for a more pleasurable and productive coding experience.

[Auto Pyro](https://github.com/websemantics/auto-pyro), a PyroCMS deploy tool for faster and more pleasurable development experience.


## Contribution

To contribute suggestions, best practices and or code samples for PyroCMS developments, please edit this document, `README.md` and create a pull request.

The [online app](http://websemantics.github.io/pyrocms-cheatsheet) is designed to read and parse the markdown included in `README.md` and present it in a user-friendly fashion.

Happy to accept external contributions to the project in the form of feedback, bug reports and even better - pull requests :)


## Credits

This project was inspired by [Laravel5 Cheatsheet](https://github.com/summerblue/laravel5-cheatsheet)


## License

[MIT license](http://opensource.org/licenses/mit-license.php)
Copyright (c) Web Semantics, Inc.
