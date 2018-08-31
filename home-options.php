<?php
/**
 * Home-Options
 *
 *
 * @package   Home-Options
 * @author    Holkan
 * @license   GPL-3.0
 * @link      https://cubeinthebox.com
 *
 * @wordpress-plugin
 * Plugin Name:       Home Options
 * Plugin URI:        https://cubeinthebox.com
 * Description:       React Home Options
 * Version:           1.0.0
 * Author:            Holkan
 * Author URI:        https://cubeinthebox.com
 * Text Domain:       wp-reactivate
 * License:           GPL-3.0
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.txt
 * Domain Path:       /languages
 */


namespace Cubeinthebox\WPR;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

define( 'HOME_OPTIONS_VERSION', '1.0.0' );


/**
 * Autoloader
 *
 * @param string $class The fully-qualified class name.
 * @return void
 *
 *  * @since 1.0.0
 */
spl_autoload_register(function ($class) {

    // project-specific namespace prefix
    $prefix = __NAMESPACE__;

    // base directory for the namespace prefix
    $base_dir = __DIR__ . '/includes/';

    // does the class use the namespace prefix?
    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        // no, move to the next registered autoloader
        return;
    }

    // get the relative class name
    $relative_class = substr($class, $len);

    // replace the namespace prefix with the base directory, replace namespace
    // separators with directory separators in the relative class name, append
    // with .php
    $file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';

    // if the file exists, require it
    if (file_exists($file)) {
        require $file;
    }
});

/**
 * Initialize Plugin
 *
 * @since 1.0.0
 */
function init() {
	$wpr = Plugin::get_instance();
	$wpr_shortcode = Shortcode::get_instance();
	$wpr_admin = Admin::get_instance();
	$wpr_rest = Endpoint\Admin::get_instance();
}
add_action( 'plugins_loaded', 'Cubeinthebox\\WPR\\init' );



/**
 * Register the widget
 *
 * @since 1.0.0
 */
function widget_init() {
	return register_widget( new Widget );
}
add_action( 'widgets_init', 'Cubeinthebox\\WPR\\widget_init' );

/**
 * Register activation and deactivation hooks
 */
register_activation_hook( __FILE__, array( 'Cubeinthebox\\WPR\\Plugin', 'activate' ) );
register_deactivation_hook( __FILE__, array( 'Cubeinthebox\\WPR\\Plugin', 'deactivate' ) );

