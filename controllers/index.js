let projectData = {}

class WeatherController {
  getWeather(req, res) {
    return res.status(200).json(projectData);
  }

  postWeather(req, res) {
    const { date, temp, content } = req.body;
    projectData = { date, temp, content };
    return res.status(201).json({
      success: true,
      message: "Update successfully!"
    });
  }
}

module.exports = new WeatherController();
