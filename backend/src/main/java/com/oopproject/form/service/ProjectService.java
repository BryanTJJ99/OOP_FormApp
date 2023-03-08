import java.util.List;

import com.oopproject.form.models.Project.Project;

public interface ProjectService{
    public List<Project> getAllProjects();

    public void addProject(Project project);


}